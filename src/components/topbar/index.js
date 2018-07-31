import { Component } from 'preact';
import style from './style';
import classNames from 'classnames';

export default class TopBar extends Component {
    constructor() {
        super();

        this.state = {
            showMenu: false,
        }

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    showMenu(event) {
        event.preventDefault();

        this.setState({ showMenu: true });
        // this.setState({ showMenu: true }, () => {
        //   document.addEventListener('click', this.closeMenu);
        // });
      }

    closeMenu() {
        this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
        });
    }

    render() {
        return (
            <div class={style.topbar}>
                <img class={style.logo} src="/static/img/img-studio-logo.svg" alt="Superblocks Studio logo"></img>
                <span class={style.tools}>
                    <span class={style.left}>
                        <img class={style.icon} src="/static/img/icon-transactions.png" alt="Open transactions screen"></img>
                        <span>Transactions</span>
                    </span>
                    <span class={style.left}>
                        <img class={classNames([style.icon, style.collaborate])} src="/static/img/icon-collaborate.png" alt="Open the transactions screen"></img>
                        <span>Collaborate</span>
                    </span>
                </span>
                <span class={style.project} onClick={this.showMenu}>
                    <img class={style.icon} src="/static/img/icon-project-selector.svg" alt="Open transactions screen"></img>
                    <span class={style.projecttext}>My super project</span>
                    <img class={style.dropdown} src="/static/img/icon-dropdown.svg" alt="Open transactions screen"></img>

                    {
                        this.state.showMenu ? (
                            <div class={style.menu}>
                                <button> Menu Item 1 </button>
                                <button> Menu Item 2 </button>
                                <button> Menu item 3 </button>
                            </div>
                        ) : (null)
                    }

                </span>
                <span class={style.right}>
                    <img class={style.icon} src="/static/img/icon-help.svg" alt="Open transactions screen"></img>
                    <span>Help</span>
                </span>
            </div>
        );
    }
}

// _menuTop = (level, index, item) => {
//     return (
//         <div>
//             <div>
//                 <a href="#" class={style.btn1} onClick={this._newDapp}  title="New Dapp">
//                     <FaIcon icon={iconPlus} />
//                 </a>
//                 <a href="#" class={style.btn1}  onClick={this._downloadWorkspace} title="Download Workspace">
//                     <FaIcon icon={iconDownload} />
//                 </a>
//                 <input id="wsFileInput" type="file" style="display: none;" onChange={e => this._uploadWorkspace(e)} ref={w => this.wsFileInput=w} />
//                 <a href="#" class={style.btn1}  onClick={e => this._clickWorkspace(e)} title="Upload Workspace">
//                     <FaIcon icon={iconUpload} />
//                 </a>
//             </div>
//         </div>
//     );
// };