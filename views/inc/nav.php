</head>
<body>
<?php if(isset($_COOKIE['user_id'])){ ?>
    <nav>
        <div>
            <a href="<?= $host ?>">
                <img src="<?= $host ?>views/asset/img/logo.png" alt="" class="logo">
            </a>
        </div>
        
        <ul class="ulNav">
            <li class="navRechercher">
                <ul class="rechercherUl" id="contenaireNavRecherche">
                    
                </ul>
                <input type="text" placeholder="Rechercher..." id="navRechercherBar" autocomplete="off">
            </li>
            <li><a href="<?= $host ?>">Accueil</a></li>
            <li><a href="<?= $host ?>categorie">Catégorie</a></li>
            <li class="navLike">
                <a href="<?= $host ?>likepage">
                    <div class="likePgae">
                        <i class="fa-regular fa-heart iconNavLike" style="color: #fa0000;"></i>
                        <span class="nbLike" id="likeCount"><?= $likeConte['COUNT(*)']; ?></span>
                    </div>
                </a>
            </li>
            <li>
                <button class="profil">
                    <div>
                        <img class="userImg" src="http://localhost/!chekerlife/views/asset/img/user/<?=$userInfo['photo_profile']; ?>" alt="">
                    </div>
                    <span class="pseudo"><?=$userInfo['pseudo']; ?></span>
                </button>
                <ul class="menu">
                        <li><i class="fa-solid fa-user"></i><a href="<?= $host ?>views/undefined-page">Profile</a></li>
                        <li><i class="fa-solid fa-gear"></i><a href="<?= $host ?>views/undefined-page">Parametre</a></li>
                        <li><form action="<?= $host ?>views/traitement/action.php" method="POST">
                            <button name="deconnexion">Déconnexion</button>
                        </form></li>
                </ul>
            </li>
        </ul>
    </nav>
    <?php }else{ ?>
        <nav>
            <div>
                <a href="<?= $host ?>">
                    <img src="<?= $host ?>views/asset/img/logo.png" alt="" class="logo">
                </a>
            </div>

            <ul class="ulNav">
                <li class="navRechercher">
                    <ul class="rechercherUl" id="contenaireNavRecherche">
                        
                    </ul>
                    <input type="text" placeholder="Rechercher..." id="navRechercherBar" autocomplete="off">
                </li>
                <li><a href="<?= $host ?>">Accueil</a></li>
                <li><a href="<?= $host ?>categorie">Catégorie</a></li>
                <li class="navLike">
                    <a href="">
                        <div class="likePgae">
                            <i class="fa-regular fa-heart iconNavLike" style="color: #fa0000;"></i>
                            <span class="nbLike">0</span>
                        </div>
                    </a>
                </li>
                <li><a href="<?= $host ?>connexion">connexion</a></li>
                <li><a href="<?= $host ?>inscription">inscription</a></li>
            </ul>
        </nav>
    <?php } ?>