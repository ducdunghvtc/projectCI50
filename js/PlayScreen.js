import { BaseComponent } from "./BaseComponent.js";
import { getDataFromDocs } from "./utils.js";

const style = `
<style>
    * {
        font-family: 'Titillium Web', sans-serif;
        text-align: center;
    }
    h2 {
        color: red;
        font-size: 25px;
    }
    img {
        margin-bottom: 50px;
        max-width:160px;
    }
    .logo{
        display: block;
    }
    .play-screen {
        position: absolute;
        border: 0;
        background-color: #faf8ef;
        width: 100%;
        width: 100%;
	      min-height:100%;
        padding: 5em 0 5em;
    }
    form button {
        color: white;
        font-family: Titillium Web, sans-serif;
        font-size: 28px;
        background-color: #8b8682;
        width:200px;
        outline: none;
        border: none;
        border-radius: 5px;
        margin-bottom:15px;
    }
    form button:hover {
        background-color: #8f7a66;
        cursor: pointer;
    }
    .ranking {
            border: 0;
            background-color: #faf8ef;;
            width: 100%;
            min-height: 100%;
            padding: 1em 0 20em;
        }
        .ranking > header {
            margin: 0 auto;
            padding: 1em;
            text-align: center;
        }
        .ranking > header h1 {
            font-weight: 600;
            font-size: 3em;
            margin: 0;
        }
        .wrapper {
            line-height: 1.5em;
            margin: 0 auto;
            padding: 2em 0 3em;
            width: 90%;
            max-width: 2000px;
            overflow: hidden;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            background: #fff;
        }
        th {
            background-color: #8B7765;
            font-weight: bold;
            color: #fff;
            white-space: nowrap;
        }
        td, th {
            padding: 1em 1.5em;
            text-align: left;
        }
        tbody th {
            background-color: #2ea879;
        }
        tbody tr:nth-child(2n-1) {
            background-color: #f5f5f5;
            transition: all .125s ease-in-out;
        }
        tbody tr:hover {
            background-color: rgba(50,98,149,.3);
        }
        td.rank {
            text-transform: capitalize;
        }
        .btn-back {
            color: white;
            font-family: Titillium Web, sans-serif;
            font-size: 28px;
            background-color: #8b8682;   
            width:120px;
            outline: none;
            border: none;
            border-radius: 5px;
            margin-bottom:15px;
        }
        .btn-back:hover {
            background-color: #8f7a66;
            cursor: pointer;
        }

</style>
`;

class PlayScreen extends BaseComponent {
  constructor(props) {
    super();
    this.state = {
      rank: [],
    };
  }
  render() {
    let topRanking = this.state.rank;
    let rank = ""; // lưu html của rank vào đây
    //  lấy dữ liệu từ firebase đổ vào rank
    for (let i = 0; i < topRanking.length; i++) {
      rank += `
             <tr>
                <td class="rank">${i + 1}</td>
                <td class="name">${topRanking[i].name}</td>
                <td class="score">${topRanking[i].hightScores}</td>
            </tr> `;
    }

    // Lay thong tin player tu fb
    let CurrentUser = JSON.parse(localStorage.getItem("Current-Player")).email;
    let currentPlayer = JSON.parse(localStorage.getItem("Current-Player"));
    (async () => {
      let response = await firebase
        .firestore()
        .collection("users")
        .where("email", "==", CurrentUser)
        .get();
      currentPlayer = response.docs[0].data();
      localStorage.setItem("Current-Player", JSON.stringify(currentPlayer));
    })();

    this._shadowRoot.innerHTML = /* html */ `
        ${style}
        
        <section class='play-screen'>
            <img src="./images/bird.png">
            <form class='form-play'>
                <h2>Hello, ${currentPlayer.name}</h2>
                <h2>Your Current Highscore Is:  ${currentPlayer.hightScores}</h2>
                
                <button type='button' class='btn-play'>Play</button>
                <br>
                <button type='button' class='btn-log-out'>Log out</button>
                <br>
                <button type='button' class='btn-ranking'>Ranking</button>
            </form>
        </section>            
            <div class="ranking">
            <header>
            <h1>Top 10 Ranking</h1>
            </header>
            <div class="wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                <tbody>
                    ${rank}
                </tbody>
                </table>
                <br>
                <button class='btn-back' style="display:none;">Back</button>
            </div>
            </div>
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
        `;
    this.$ranking = this._shadowRoot.querySelector(".btn-ranking");
    this.$back = this._shadowRoot.querySelector(".btn-back");

    this.$ranking.onclick = () => {
      var x = this._shadowRoot.querySelector(".play-screen");
      var y = this._shadowRoot.querySelector(".btn-back");
      y.style.display = "block";
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    };

    this.$logOut = this._shadowRoot.querySelector(".btn-log-out");
    this.$play = this._shadowRoot.querySelector(".btn-play");
    this.$status = this._shadowRoot.querySelector(".status");

    this.$logOut.onclick = () => {
      localStorage.clear();
      router.navigate("#!/login");
    };

    this.$play.onclick = () => {
      window.location.href = "./game.html";
    };

    this.$back.onclick = () => {
      this._shadowRoot.querySelector(".play-screen").style.display = "block";
      this._shadowRoot.querySelector(".btn-back").style.display = "none";
    };
  }

  componentDidMount() {
    //  khởi tạo dữ liệu cho state: rank
    firebase
      .firestore()
      .collection("users")
      .onSnapshot(async (snap) => {
        let score1 = await firebase
          .firestore()
          .collection("users")
          .orderBy("hightScores", "desc")
          .limit(10)
          .get();
        this.setState({
          //  setState cho rank là 10 người chơi có điểm cao nhất
          rank: getDataFromDocs(score1.docs),
        });
      });
  }
}

window.customElements.define("play-screen", PlayScreen);
