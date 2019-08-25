$(function() {

  var search_result = $("#user-search-result");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="ユーザーのid" data-user-name="ユーザー名">追加</div>
                </div>`
                search_result.append(html);
  }
  function appendErrMsgToHTML(msg) {
    var html = `<div class='chat-group-user__name'>${ msg }</div>`
    search_result.append(html);
  }

  $(".username__input").on("keyup", function() {
    var input = $(".username__input").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      console.log(users);
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        })
      } else {
        appendErrMsgToHTML("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });

  $(document).on("click", ".chat-group-user__btn--add", function(){
    $(this).parent().remove();
  })
});