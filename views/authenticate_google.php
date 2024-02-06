<?php
require_once "../model/userModel.php";
if(isset($_COOKIE['token'])) {
    header("Location: index");
}else if (isset($_POST['credential'])) {
    $credential = $_POST['credential'];

    list($header, $payload, $signature) = explode('.', $credential);

    $decodedHeader = base64_decode($header);
    $decodedPayload = base64_decode($payload);
    
    $headerData = json_decode($decodedHeader, true);
    $payloadData = json_decode($decodedPayload, true);
    // print_r($payloadData);
    
    $name = $payloadData['given_name'] ?? '';
    $family_name = $payloadData['family_name'] ?? '';
    $email = $payloadData['email'] ?? '';
    $picture = $payloadData['picture'] ?? '';
    $sub = $payloadData['sub'] ?? '';
    $hashedSub = password_hash($sub, PASSWORD_DEFAULT);

    // echo "<br>Nom: $name<br>";
    // echo "Prénom: $family_name<br>";
    // echo "Email: $email<br>";
    // echo 'id google : '. $sub . '<br>';
    // echo 'id google  hach: '. $hashedSub . '<br>';
    // echo '<img src="'.$picture.'" alt="" style="width: 100px; height: 100px"><br>';
    $user = User::googleAconteVerify($email, $sub);
    if($user[0]){
        echo "il a un compte <br>";
        if($user[1]){
            echo "true";
        }else{
            echo "false";
        }
    }else{
        echo "il na pas de compte <br>";
    }
}else{
    header("Location: index");
}
?>
<!-- <?php require_once "inc/header.php"; ?>
<title>authenticate google</title>
<?php require_once "inc/nav.php"; ?>
<?php require_once "inc/footer.php"; ?>