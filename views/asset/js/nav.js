$likeCount = $("#likeCount").text();
if($likeCount < 10){
    $("#likeCount").css({     
        right: "10px"        
      });       
}else if ($likeCount >= 10 && $likeCount < 100){
    $("#likeCount").css({     
        right: "8px"        
      });
}else if($likeCount >= 100 && $likeCount < 1000){
    $("#likeCount").css({     
      right: "5px"        
    });
}