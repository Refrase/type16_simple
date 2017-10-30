const projectIntro = document.getElementById('projectIntro')


if ( projectIntro ) {
  window.addEventListener( 'scroll', () => {
    const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
    window.setTimeout( () => {
      if ( scrollTop > 200 ) {
        projectIntro.className = "fadeOut"
      } else {
        projectIntro.className = "visible"
      }
    }, 100)
  })
}
