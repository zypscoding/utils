import React from 'react'
import './index.scss'

export default function index(props) {
  const { fill = '#ccc', fillOpacity = 0.2, fontSize = '30px', content = 'WaterMark', rotate = 'rotate(-45, 30 0)',width='200', height='160' } = props
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="400" height="300" viewBox="0 0 300 160">
    <text x="0" y="200" 
        text-anchor="middle" 
        fill=${fill}
        fill-opacity=${fillOpacity} 
        transform="rotate(-45, 30 0)" 
        style=${fontSize}
    >${content}</text>
    </svg>`
  const url = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='${width}px' height='${height}px' viewBox='0 0 200 160'%3E %3Ctext x='-100' y='-30' fill='${encodeURIComponent(fill)}' transform = 'rotate(-35 240 -200)' fill-opacity='${fillOpacity} ' font-size='${fontSize}'%3E${content}%3C/text%3E %3C/svg%3E ")`
  return <div className="WaterMark" style={{ backgroundImage: url }}></div>
}
