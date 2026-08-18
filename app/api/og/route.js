import { ImageResponse } from 'next/og';
import { getImg } from "@/data/Data"; 
import Image from "next/image";

export const runtime = 'edge'; 

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'EtherealDreams';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#050505',
          position: 'relative',
        }}
      >
        <Image
          src={getImg()} 
          style={{ 
            position: 'absolute', 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            opacity: 0.5 
          }} 
          alt="background"
        />

        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.4)',
        }} />

        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            zIndex: 10 
          }}
        >
          <div style={{ color: '#fff', fontSize: 64, fontWeight: 'bold', marginBottom: 10 }}>
            {title}
          </div>
          <div style={{ color: '#ccc', fontSize: 24, marginBottom: 40 }}>
            Explore the mystic automotive art gallery
          </div>

          <div style={{
            display: 'flex',
            padding: '12px 32px',
            backgroundColor: '#ffffff',
            borderRadius: '50px',
            color: '#000',
            fontSize: 24,
            fontWeight: '600',
          }}>
            View Gallery
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}