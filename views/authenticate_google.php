<?php
if(isset($_COOKIE['token'])) {
    header("Location: index");
}else if (isset($_POST['credential'])) {
    $credential = $_POST['credential'];

    list($header, $payload, $signature) = explode('.', $credential);

    $decodedHeader = base64_decode($header);
    $decodedPayload = base64_decode($payload);
    
    $headerData = json_decode($decodedHeader, true);
    $payloadData = json_decode($decodedPayload, true);
    print_r($payloadData);
    
    $name = $payloadData['given_name'] ?? '';
    $family_name = $payloadData['family_name'] ?? '';
    $email = $payloadData['email'] ?? '';
    $picture = $payloadData['picture'] ?? '';
    $hashedSub = password_hash($payloadData['sub'], PASSWORD_DEFAULT);

    echo "<br>Nom: $name<br>";
    echo "Prénom: $family_name<br>";
    echo "Email: $email<br>";
    echo 'id google : '. $hashedSub . '<br>';
    echo '<img src="'.$picture.'" alt=""><br>';
}else{
    header("Location: index");
}
?>
<!-- <?= User::googleAconteVerify($email, $payloadData['sub']); ?> -->
<!-- <?php require_once "inc/header.php"; ?> -->
<!-- <title>authenticate google</title> -->
<!-- <?php require_once "inc/nav.php"; ?> -->
<!-- <?php require_once "inc/footer.php"; ?> -->