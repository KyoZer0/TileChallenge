export default function PlayArcadePage() {
    return (
        <>
            <style>{`
                html, body { margin: 0; padding: 0; overflow: hidden; height: 100%; }
            `}</style>
            <iframe
                src="/game-arcade/index.html"
                style={{
                    position: 'fixed',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    display: 'block',
                    overflow: 'hidden',
                }}
                title="FillWords Arcade"
                allow="autoplay"
                scrolling="no"
            />
        </>
    );
}
