// components/LerneinheitNode.jsx

export default function LerneinheitNode({ data }) {
    return (
      <div
        style={{
          width: data.width,
          height: data.height,
          background: '#e6fefc',
          border: '2px solid #30b89b',
          borderRadius: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          fontSize: 12,
          fontWeight: 'bold',
          overflow: 'hidden',
        }}
      >
        {/* Medien-Icon */}
        <div
          style={{
            width: '100%',
            height: '60%',
            background: '#d5f4ee',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
          }}
        >
          📄
        </div>
  
        {/* Titelbereich */}
        <div
          style={{
            height: '40%',
            width: '100%',
            background: '#f7f7f7',
            color: '#333',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 4px',
            textAlign: 'center',
          }}
        >
          {data.title}
        </div>
      </div>
    );
  }
  