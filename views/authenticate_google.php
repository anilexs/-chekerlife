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
    
    $name = $payloadData['given_name'] ?? '';
    $prenom = $payloadData['family_name'] ?? '';
    $email = $payloadData['email'] ?? '';
    $picture = $payloadData['picture'] ?? '';
    $sub = $payloadData['sub'] ?? '';
    $hashedSub = password_hash($sub, PASSWORD_DEFAULT);

    $user = User::googleAconteVerify($email, $sub);
    if($user[0]){
        echo "il a un compte <br>";
        echo 'id google : '. $sub . '<br>';

        
        echo "Nom: $name<br>";
        echo "Prénom: $prenom<br>";
        echo "Email: $email<br>";
        echo 'id google  hach: '. $hashedSub . '<br>';
        echo '<img src="'.$picture.'" alt="" style="width: 100px; height: 100px"><br>';
        if($user[1]){
            $userInfo = User::loginGoogle($email);
            var_dump($userInfo);
        }else{
            echo "false";
        }
    }else{
        $dateEtHeure = date("Y-m-d-H:i:s");
        echo "La date et l'heure actuelles sont : " . $dateEtHeure;

        $inscription = User::inscriptionGoogle($name, $prenom, $email, $hashedSub, $picture);
        echo $inscription;
    }
}else{
    header("Location: index");
}
?>
<?php require_once "inc/header.php"; ?>
<link rel="stylesheet" href="asset/css/authenticate_google.css">
<title>authenticate google</title>
<?php require_once "inc/nav.php"; ?>
<?php require_once "inc/footer.php"; ?>
<script>
    $(document).ready(function() {
    $("body::before").on("animationend", function() {
        console.log("fini");
    });
    });
</script>