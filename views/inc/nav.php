</head>
<body>
<?php if(isset($_COOKIE['user_id'])){ ?>
    <nav>
        <form action="" method="get">
            <input type="text" placeholder="Rechercher..." id="rechercher">
        </form>
        <ul>
            <li><a href="http://localhost/!chekerlife/">Accueil</a></li>
            <li><a href="http://localhost/!chekerlife/categorie">Catégorie</a></li>
            <li class="navLike">
                <a href="likepgae">
                    <div class="likePgae">
                        <i class="fa-regular fa-heart iconNavLike" style="color: #fa0000;"></i>
                        <span class="nbLike" id="likeCount"><?= $likeConte['COUNT(*)']; ?></span>
                    </div>
                </a>
            </li>
            <li><form action="http://localhost/!chekerlife/views/traitement/action.php" method="POST">
                <button name="deconnexion">Déconnexion</button>
            </form></li>
        </ul>
    </nav>
    <?php }else{ ?>
        <nav>
            <form action="" method="get">
                <input type="text" placeholder="Rechercher..." id="rechercher">
            </form>
            <ul>
                <li><a href="http://localhost/!chekerlife/">Accueil</a></li>
                <li><a href="http://localhost/!chekerlife/categorie">Catégorie</a></li>
                <li class="navLike">
                    <a href="">
                        <div class="likePgae">
                            <i class="fa-regular fa-heart iconNavLike" style="color: #fa0000;"></i>
                            <span class="nbLike">0</span>
                        </div>
                    </a>
                </li>
                <li><a href="http://localhost/!chekerlife/connexion">connexion</a></li>
                <li><a href="http://localhost/!chekerlife/inscription">inscription</a></li>
            </ul>
        </nav>
    <?php } ?>