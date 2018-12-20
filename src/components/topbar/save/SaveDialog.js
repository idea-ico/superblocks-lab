// Copyright 2018 Superblocks AB
//
// This file is part of Superblocks Lab.
//
// Superblocks Lab is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation version 3 of the License.
//
// Superblocks Lab is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Superblocks Lab.  If not, see <http://www.gnu.org/licenses/>.

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';
import classNames from 'classnames';
import style from './style.less';
import {
    IconCopy,
    IconConfigure
} from '../../icons';
import Note from '../../note';
import TextInput from '../../textInput';
import Tooltip from '../../tooltip';
import Backend from '../../projecteditor/control/backend';
import UploadSettings from './UploadSettings';

class SaveDialog extends Component {

    state = {
        keepState: false,
        uploading: false,
        shareURL: "ds",
        showUploadSettings: false
    }

    onChange = (checked) => {
        this.setState({
            keepState: checked
        });
    }

    ipfsSyncUp = () => {
        const { keepState } = this.state;
        const { projectId } = this.props;

        this.setState({
            uploading: true
        });

        const backend = new Backend();
        backend.ipfsSyncUp(projectId, keepState)
            .then(hash => {
                this.setState({
                    shareURL: document.location.href + '#/ipfs/' + hash
                });
            })
            .catch(e => {
                console.log(e);
                alert('Error: Something went wrong when uploading to IPFS. Please try agin later.');
            })
            .finally(() => this.setState({ uploading: false }));
    }

    copyShareUrl = () => {
        const { shareURL } = this.state;
        copy(shareURL);
    }

    uploadSettingsClick = () => {
        this.setState({
            showUploadSettings: true
        })
    }

    onUploadSettingsBackClicked = () => {
        this.setState({
            showUploadSettings: false
        });
    }

    onUploadSettingsChanged = (uploadSettings) => {
        this.setState({
            uploadSettings: uploadSettings
        })
    }

    renderDialog() {
        return (
            <div className={style.content}>
                <img src={'/static/img/img-ipfs-logo.svg'} className={style.logo}/>
                <h3>Upload project to IPFS</h3>
                <div className={style.description}>Backup and share your project by uploading to IPFS. Remember to not include any personal data, and enjoy decentralization!</div>
                <br/>
                <div>
                    <button className="btn2" onClick={this.ipfsSyncUp}>Upload Project</button>
                    <button className={classNames([style.uploadSettings, "btnNoBg"])} onClick={this.uploadSettingsClick}>
                        <Tooltip title="Upload Settings">
                            <IconConfigure />
                        </Tooltip>
                    </button>
                </div>
                <br/>
                <Note
                    title="Warning"
                    text="Due to the nature of IPFS, might not be possible to delete your project from the network."
                />
            </div>
        );
    }

    renderUploading() {
        return(
            <div className={style.content}>
                <img src={'/static/img/img-ipfs-logo.svg'} className={style.logo}/>
                <div>Uploading...</div>
            </div>
        );
    }

    renderShareURL(shareURL) {
        return (
            <div className={style.content}>
                <img src={'/static/img/img-ipfs-logo.svg'} className={style.logo}/>
                <div className={style.share}>
                    <TextInput
                        label="Share your project"
                        defaultValue={shareURL}
                        disabled={true}
                    />
                    <button className="btnNoBg" onClick={this.copyShareUrl}>
                        <Tooltip title="Copy URL">
                            <IconCopy />
                        </Tooltip>
                    </button>
                </div>
                <div className={style.lastUpdate}>Last Update: 23 seconds ago</div>
                <div>
                    <button className="btn2" onClick={this.ipfsSyncUp}>New Upload</button>
                    <button className={classNames([style.uploadSettings, "btnNoBg"])} onClick={this.uploadSettingsClick}>
                        <Tooltip title="Upload Settings">
                            <IconConfigure />
                        </Tooltip>
                    </button>
                </div>

            </div>
        );
    }

    render() {
        const { uploading, shareURL, showUploadSettings } = this.state;
        return (
            <div className={style.shareDialogContainer}>
                { uploading ?
                    this.renderUploading()
                :
                    showUploadSettings ?
                        <UploadSettings
                            onBackClicked={this.onUploadSettingsBackClicked}
                            onChange={this.onUploadSettingsChanged}
                        />
                    :
                        shareURL ?
                            this.renderShareURL(shareURL)
                        :
                            this.renderDialog()
                }
            </div>
        )
    }
}

export default SaveDialog;

SaveDialog.propTypes = {
    projectId: PropTypes.string.isRequired
}
