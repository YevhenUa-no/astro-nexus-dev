const MatrixBackground = () => {
  return (
    <div className="fixed inset-0 z-[-2]">
      <div className="matrix-bg" />
      <div className="matrix-rain" />
      
      {/* Additional floating orbs */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-glow rounded-full opacity-20 float-animation" />
      <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-glow rounded-full opacity-15 float-animation" style={{animationDelay: '2s'}} />
      <div className="absolute bottom-40 left-40 w-16 h-16 bg-gradient-glow rounded-full opacity-25 float-animation" style={{animationDelay: '4s'}} />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-glow rounded-full opacity-10 float-animation" style={{animationDelay: '1s'}} />
    </div>
  );
};

export default MatrixBackground;