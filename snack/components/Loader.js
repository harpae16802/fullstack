// components/Loader.js
export default function Loader() {
    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <img src="/loading.gif" alt="Loading..." />
        </div>
    );
}
