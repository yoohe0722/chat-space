$(function(){
  function buildHTML(message){
    var image = message.image? `<img src= "${message.image}"></img>`: "";
    var html =`<div class="message" data-id="${message.id}">
                <div class="upper-message">
                  <div class="upper-message__user-name">
                    ${message.user_name}
                  </div>
                  <div class="upper-message__date">
                    ${message.created_at}
                  </div>
                </div>
                <div class="lower-message">
                  <p class="lower-message__content">
                    ${message.content}
                  </p>
                    ${image}
                </div>
              </div>`
              return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('エラー')
    })
    .always(() => {
      $(".form__submit").removeAttr("disabled");
      });
  })

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    group_id = $(".group_detail__current-group").attr('data-id');
    last_message_id = $(".message:last").attr('data-id');
    console.log(last_message_id)
    console.log(group_id)
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: `/groups/${group_id}/api/messages`,
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
          messages.forEach(function(message){
            insertHTML = buildHTML(message);
          });
        $('.messages').append(insertHTML);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        }
      })
    .fail(function() {
      console.log('error');
    });
  };
  if(document.URL.match('/messages'))　{
    setInterval(reloadMessages, 5000);
  }
});