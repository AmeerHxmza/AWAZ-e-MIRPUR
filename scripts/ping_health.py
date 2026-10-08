"""
Keep-alive ping script for AWAZ-e-MIRPUR backend on Render Free Tier.
Sends a POST request to /health every 14 minutes.

Usage:
    python ping_health.py https://awaz-e-mirpur-api.onrender.com
"""

import sys
import time
import urllib.request
import urllib.error
import datetime

INTERVAL_SECONDS = 14 * 60  # 14 minutes

def ping(url: str):
    health_url = url.rstrip("/") + "/health"
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] Pinging POST {health_url} ...")
    try:
        req = urllib.request.Request(
            health_url,
            data=b"{}",
            headers={"Content-Type": "application/json", "User-Agent": "AWAZ-e-MIRPUR-KeepAlive/1.0"},
            method="POST"
        )
        with urllib.request.urlopen(req, timeout=30) as resp:
            body = resp.read().decode("utf-8")
            print(f"[{timestamp}] Success! Status: {resp.status}, Body: {body}")
    except urllib.error.HTTPError as e:
        print(f"[{timestamp}] HTTP Error: {e.code} {e.reason}")
    except Exception as e:
        print(f"[{timestamp}] Failed to ping: {e}")

def main():
    if len(sys.argv) < 2:
        print("Usage: python ping_health.py <RENDER_BACKEND_URL>")
        print("Example: python ping_health.py https://awaz-e-mirpur-api.onrender.com")
        sys.exit(1)

    url = sys.argv[1]
    print(f"Starting keep-alive daemon for {url} every 14 minutes.")
    while True:
        ping(url)
        print(f"Sleeping for {INTERVAL_SECONDS // 60} minutes...\n")
        time.sleep(INTERVAL_SECONDS)

if __name__ == "__main__":
    main()
