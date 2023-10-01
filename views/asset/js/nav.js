$likeCount = $("#likeCount").text();
if($likeCount < 10){
    $("#likeCount").css({     
        right: "10px"        
      });       
}else{
    $("#likeCount").css({     
        right: "8px"        
      });
}