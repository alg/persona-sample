$(function() {
  // login button handler
  var login = $("#login");
  login.click(function(e) { e.preventDefault(); navigator.id.request(); });

  // logout button handler
  var logout = $("#logout");
  logout.click(function(e) { e.preventDefault(); navigator.id.logout(); });

  // current user login verification
  var currentUser = $("meta[name='currentUser']").attr('content');
  navigator.id.watch({
    loggedInUser: currentUser || null,

    // login callback as the result of navigator.id.request() if
    // loggedInUser either expired or never logged at the moment of the call.
    onlogin: function(a) {
      $.post('/login',
        { assertion: a },
        function(res, status, xhr) { window.location.reload(); });
    },

    // logout callback as the result of navigator.id.logout()
    onlogout: function() {
      console.log('logout');
      $.post('/logout',
        {},
        function(res, status, xhr) { window.location.reload(); });
    }
  });
});
