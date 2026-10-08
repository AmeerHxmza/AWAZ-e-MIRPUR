import os
import folium
from folium.plugins import HeatMap

STATIC_DIR = os.path.join(os.path.dirname(__file__), "..", "static")


def _complaints_with_coords(complaints: list):
    return [c for c in complaints if c.latitude is not None and c.longitude is not None]


def build_map(complaints: list) -> folium.Map:
    """Build a Folium map with heatmap and optional DBSCAN cluster centers."""
    m = folium.Map(location=[33.1484, 73.7519], zoom_start=13)
    valid = _complaints_with_coords(complaints)
    coords = [[c.latitude, c.longitude] for c in valid]

    if coords:
        HeatMap(coords, radius=12, blur=18).add_to(m)

        if len(coords) >= 2:
            try:
                from sklearn.cluster import DBSCAN
                import numpy as np

                X = np.radians(np.array(coords))
                kms_per_radian = 6371.0
                epsilon_km = 0.5
                db = DBSCAN(
                    eps=epsilon_km / kms_per_radian,
                    min_samples=2,
                    metric="haversine",
                ).fit(X)
                labels = db.labels_
            except Exception:
                # Fallback pure-python distance clustering for Windows SAC environments
                import math

                def _dist_km(p1, p2):
                    R = 6371.0
                    dlat = math.radians(p2[0] - p1[0])
                    dlon = math.radians(p2[1] - p1[1])
                    a = math.sin(dlat / 2) ** 2 + math.cos(math.radians(p1[0])) * math.cos(math.radians(p2[0])) * math.sin(dlon / 2) ** 2
                    return 2 * R * math.atan2(math.sqrt(a), math.sqrt(1 - a))

                labels = [-1] * len(coords)
                cluster_id = 0
                for i in range(len(coords)):
                    neighbors = [j for j in range(len(coords)) if _dist_km(coords[i], coords[j]) <= 0.5]
                    if len(neighbors) >= 2:
                        for n in neighbors:
                            if labels[n] == -1:
                                labels[n] = cluster_id
                        cluster_id += 1

            for label in set(labels):
                if label == -1:
                    continue
                cluster_pts = [coords[i] for i in range(len(coords)) if labels[i] == label]
                if not cluster_pts:
                    continue
                lat_c = sum(p[0] for p in cluster_pts) / len(cluster_pts)
                lon_c = sum(p[1] for p in cluster_pts) / len(cluster_pts)
                folium.Marker(
                    [lat_c, lon_c],
                    popup=f"Hotspot cluster ({len(cluster_pts)} reports)",
                    icon=folium.Icon(color="red", icon="info-sign"),
                ).add_to(m)

    return m


def save_heatmap_html(complaints: list, path: str) -> str:
    os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
    m = build_map(complaints)
    m.save(path)
    return path


def run(complaints: list) -> str:
    print("Agent 4: GPS Clustering (Geo Agent)")
    os.makedirs(STATIC_DIR, exist_ok=True)
    heatmap_path = os.path.join(STATIC_DIR, "heatmap.html")
    return save_heatmap_html(complaints, heatmap_path)
