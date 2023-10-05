</head>
<body>
<?php if(isset($_COOKIE['user_id'])){ ?>
    <nav>
        <div>
            <a href="<?= $host ?>">
                <img src="<?= $host ?>views/asset/img/logo.png" alt="" class="logo">
            </a>
        </div>
        
        <ul>
            <li><form action="" method="get">
                <input type="text" placeholder="Rechercher..." id="rechercher">
            </form></li>
            <li><a href="<?= $host ?>">Accueil</a></li>
            <li><a href="<?= $host ?>categorie">Catégorie</a></li>
            <li class="navLike">
                <a href="likepgae">
                    <div class="likePgae">
                        <i class="fa-regular fa-heart iconNavLike" style="color: #fa0000;"></i>
                        <span class="nbLike" id="likeCount"><?= $likeConte['COUNT(*)']; ?></span>
                    </div>
                </a>
            </li>
            <li>
                <button>
                    <div class="userImg">
                        <img src="<?= $host ?>views/asset/img/user/<?=$userInfo['photo_profile']; ?>" alt="">
                    </div>
                </button>
            </li>
            <!-- <li><form action="<?= $host ?>views/traitement/action.php" method="POST">
                <button name="deconnexion">Déconnexion</button>
            </form></li> -->
        </ul>
    </nav>
    <?php }else{ ?>
        <nav>
            <div>
                <a href="<?= $host ?>">
                    <img src="<?= $host ?>views/asset/img/logo.png" alt="" class="logo">
                </a>
            </div>

            <ul>
                <li><form action="" method="get">
                    <input type="text" placeholder="Rechercher..." id="rechercher">
                </form></li>
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