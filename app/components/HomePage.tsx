"use client"

import '../globals.scss'

export default function HomePage() {

  return (
    <div className="container">
      <h1>Østrungens venner</h1>

      <iframe src="https://www.meteoblue.com/en/weather/maps/widget/trondheim_norwegen_3133880?windAnimation=1&gust=1&satellite=1&cloudsAndPrecipitation=1&temperature=1&sunshine=1&extremeForecastIndex=1&geoloc=fixed&tempunit=C&lengthunit=metric&windunit=km%252Fh&zoom=5&autowidth=auto&user_key=52d7fa8cb4b7fe4c&embed_key=f0ba0e54d95121f7&sig=2e6b6128ed91fc88d42e652743b8925b38c54e26b15964bf9386c000b3817dbd" allowTransparency style={{ width: "100%", height: "700px", border: 0, overflow: "hidden" }}></iframe><div><a href="https://www.meteoblue.com/de/wetter/woche/index" target="_blank" rel="noopener">meteoblue</a>
      </div>
    </div>
  )
}