export default function PlayGamePage() {
    return (
        <>
            <style>{`
                html, body { margin: 0; padding: 0; overflow: hidden; height: 100%; }
            `}</style>
            <iframe
                src="/game-arcade/index.html"
                style={{
                    position: 'fixed',
                    top: '72px', left: 0, right: 0, bottom: 0,
                    width: '100%',
                    height: 'calc(100% - 72px)',
                    border: 'none',
                    display: 'block',
                    overflow: 'hidden',
                }}
                title="FillWords Game"
                allow="autoplay"
                scrolling="no"
            />
        </>
    );
}
