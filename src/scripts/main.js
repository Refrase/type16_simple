const projectIntro = document.getElementById('projectIntro')

if ( projectIntro ) {
  window.addEventListener( 'scroll', () => {
    console.log(document.body.scrollTop);
    if ( document.body.scrollTop > 200 ) {
      projectIntro.className = "fadeOut";
    } else {
      projectIntro.className = "visible";
    }
  })
}
