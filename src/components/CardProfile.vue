<template>
<div class="profil-list">
    <div class="card grey">
        <span class="edit-icon">
            <a href=""><img src="../assets/icon_edit.svg"></a>
        </span>
        <div class="profile">
            <img src="../assets/trump.jpg">
            <span>
                <h3>Jelo Caviar, @jelo</h3>
                <btn class="line"><img src="../assets/icon_setting.svg">Terverifikasi</btn>
            </span>
            <p>An ordinary netizen who likes to talk a lot. Like, a lot. Who cares anyway!</p>
        </div>
    </div>
    <div class="card">
        <div class="list-wrap">
            <h4 class="title">Cluster</h4>
            <div class="item">
                <img src="../assets/user.svg">
                <p>Universitas Gajah Mada</p>
                <span class="icon"><a href=""><img src="../assets/icon_more_vertical.svg"></a></span>
            </div>
        </div>
        <div class="list-wrap">
            <h4 class="title">Biodata<a href=""><img src="../assets/icon_edit.svg"></a></h4>
            <div class="item">
                <img src="../assets/icon_point.svg">
                <p>Bandung</p>
            </div>
            <div class="item">
                <img src="../assets/icon_open_book.svg">
                <p>Universitas Gajah Mada</p>
                </div>
            <div class="item">
                <img src="../assets/icon_briefcase.svg">
                <p>Pantau Bersama</p>
                </div>
        </div>
        <div class="list-wrap">
            <h4 class="title">Badge</h4>
            <div class="item">
                <img src="../assets/sketchbook.png">
                <span>
                    <p>CLEVER</p>
                    <p class="sub-text">Misi Tanya Presiden 10X</p>
                </span>
            </div>
            <div class="item">
                <img src="../assets/hearts.png">
                <span>
                    <p>LOPELOPE</p>
                    <p class="sub-text">Ikut Kuis Pendidikan</p>
                </span>
                </div>
            <div class="item">
                <img src="../assets/headphones.png">
                <span>
                    <p>LISTENER</p>
                    <p class="sub-text">Ikut Kuis Pendidikan</p>
                </span>
                </div>
        </div>
    </div>
    
    <div class="card tabs">
        <div class="nav-tabs">
            <ul>
                <li><a href=""><img src="../assets/icon_book.svg"></a></li>
                <li><a href=""><img src="../assets/icon_education.svg"></a></li>
                <li><a href=""><img src="../assets/icon_record.svg"></a></li>
                <li><a href=""><img src="../assets/icon_report.svg"></a></li>
                <li><a href=""><img src="../assets/icon_date.svg"></a></li>
            </ul>
        </div>
        <ListCardJP></ListCardJP>
        <ListCardJP></ListCardJP>
    </div>
</div>

</template>

<script>
import ListCardJP from '@/components/ListCardJP'
export default {
    name: 'CardProfile',
    components: {
        ListCardJP

    }
}
</script>