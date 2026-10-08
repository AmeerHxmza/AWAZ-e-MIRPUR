import os
import shutil
import threading
import wave
from pathlib import Path
from typing import Optional
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent.parent / ".env")

# Urdu + English civic context helps OpenAI Whisper model decode accurately
_WHISPER_PROMPT = (
    "AWAZ-e-MIRPUR (آوازِ میرپور) civic complaint for Mirpur City, Azad Jammu & Kashmir (AJK). "
    "Urdu vocabulary: پانی کی قلت، نالی بند، سیوریج، گٹر، سڑک کی ٹوٹ پھوٹ، کھڈے، کوڑا کرکٹ، بلدیہ میرپور، "
    "محکمہ پبلک ہیلتھ، ایم ڈی اے، واپڈا، شکایت۔ "
    "English vocabulary: water supply shortage, broken pipes, open sewage, drainage overflow, "
    "potholes, garbage dumping, sanitation, Municipal Corporation Mirpur, MDA, PHE."
)


def _transcribe_via_openai_api(file_path: str, language: Optional[str] = None) -> str:
    """
    Transcribes audio using OpenAI's Whisper-1 cloud API.
    Supports Urdu, English, Roman Urdu, and bilingual audio.
    """
    api_key = os.getenv("OPENAI_API_KEY", "").strip()
    if not api_key:
        raise RuntimeError(
            "OPENAI_API_KEY is not configured in backend/.env. "
            "Please add your OpenAI API key to backend/.env to transcribe audio."
        )

    from openai import OpenAI
    client = OpenAI(api_key=api_key)

    params = {
        "model": "whisper-1",
        "prompt": _WHISPER_PROMPT,
        "temperature": 0.0,
    }

    # Only pass language if explicitly requested as 'ur' or 'en'.
    # If None / 'auto' / empty, Whisper automatically detects language!
    if language:
        normalized_lang = language.strip().lower()
        if normalized_lang in ("ur", "urdu"):
            params["language"] = "ur"
        elif normalized_lang in ("en", "english"):
            params["language"] = "en"

    with open(file_path, "rb") as audio_file:
        params["file"] = audio_file
        transcription = client.audio.transcriptions.create(**params)

    text = (transcription.text or "").strip()
    return text


def _load_wav_mono_float32_16k(path: str):
    """Load WAV without ffmpeg for local processing if ever needed."""
    import numpy as np

    with wave.open(path, "rb") as wf:
        sr = wf.getframerate()
        nch = wf.getnchannels()
        sw = wf.getsampwidth()
        nframes = wf.getnframes()
        raw = wf.readframes(nframes)

    if sw == 2:
        data = np.frombuffer(raw, dtype="<i2").astype(np.float32) / 32768.0
    elif sw == 4:
        data = np.frombuffer(raw, dtype="<i4").astype(np.float32) / 2147483648.0
    elif sw == 1:
        data = (np.frombuffer(raw, dtype=np.uint8).astype(np.float32) - 128.0) / 128.0
    else:
        raise RuntimeError(f"Unsupported WAV sample width: {sw} bytes")

    if nch > 1:
        data = data.reshape(-1, nch).mean(axis=1)

    if sr != 16000:
        duration = len(data) / sr
        new_len = max(1, int(duration * 16000))
        x_old = np.linspace(0, len(data) - 1, num=len(data), dtype=np.float64)
        x_new = np.linspace(0, len(data) - 1, num=new_len, dtype=np.float64)
        data = np.interp(x_new, x_old, data).astype(np.float32)

    return data.astype(np.float32)


def transcribe_audio(file_path: str, language: Optional[str] = None) -> str:
    """
    Transcribes voice recording using OpenAI Whisper API (fast, handles both Urdu & English).
    Falls back to local Whisper if installed.
    """
    # 1. Primary: OpenAI Whisper-1 Cloud API (Industry Standard, fast, minimal server RAM)
    try:
        text = _transcribe_via_openai_api(file_path, language=language)
        if text:
            return text
        return "No speech detected in recording. Please record again or use text mode."
    except Exception as e_api:
        api_err_msg = str(e_api)
        print(f"OpenAI Whisper API error: {api_err_msg}. Checking local whisper fallback...")

        # 2. Secondary fallback: Local whisper (if installed)
        try:
            import whisper
            model_name = (os.getenv("WHISPER_MODEL") or "base").strip()
            model = whisper.load_model(model_name)
            lower = file_path.lower()
            kw = {"task": "transcribe", "fp16": False, "initial_prompt": _WHISPER_PROMPT}
            if language in ("ur", "en"):
                kw["language"] = language

            if lower.endswith(".wav"):
                audio = _load_wav_mono_float32_16k(file_path)
                result = model.transcribe(audio, **kw)
            else:
                result = model.transcribe(file_path, **kw)

            text = (result.get("text") or "").strip()
            if text:
                return text
        except Exception:
            pass

        # If both fail, raise the clear message explaining the issue
        raise RuntimeError(f"Transcription failed: {api_err_msg}") from e_api
