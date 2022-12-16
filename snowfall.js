function init(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var w=canvas.width;
    var h=canvas.height;
    var bg=new Image();
    bg.src = "snowimg/red-christmas-background-953x610.jpg";
    var flakes=[];
  
    function snowfall () {
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(bg, 0, 0);
      addFlake();
      snow();
    };
    function addFlake () {
      var x = Math.ceil(Math. random() * w);
      var s = Math.ceil(Math. random() * 4);
        flakes.push({"x": x, "y": 0, "s": s});
    };
     function snow ( ) {
         for (var i = 0; i < flakes. length; i++) {
          var flake= flakes[i];
          ctx.beginPath();
          ctx.fillstyle="rgb(255,255,255)";
          ctx.arc(flake.x, flakes[i].y+=flake.s/2,flake.s/2, 0, 2 * Math.PI);
          ctx.fill();
          if (flakes[i].y>h){
              flakes.splice(i, 1);
            }
     };
    };
    setInterval(snowfall, 20);
  };
  window.onload=init;