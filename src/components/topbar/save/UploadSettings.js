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
import style from './style.uploadsettings.less';
import {
    IconBack
} from '../../icons';
import Switch from '../../switch';

export default class UploadSettings extends Component {
    state = {
        includeBuildInfo: false
    }

    onBackClicked = () => {
        this.props.onBackClicked();
    }

    onIncludeBuildChange = (checked) => {
        const { onChange } = this.props;
        const newState = {
            includeBuildInfo: checked
        }
        this.setState(newState);

        // Make sure to notify also the parent
        onChange(newState);
    }

    render() {
        const { includeBuildInfo } = this.state;
        return (
            <div>
                <div className={style.header}>
                    <button className="btnNoBg" onClick={this.onBackClicked}>
                        <IconBack/>
                    </button>
                    <div className={style.text}>Upload Settings</div>
                </div>
                <div className={style.buildInfo}>
                    <div className={style.title}>Include build information</div>
                    <div className={style.descContainer}>
                        <div>This will upload the content of your build folder</div>
                        <Switch
                            checked={includeBuildInfo}
                            onChange={this.onIncludeBuildChange}
                        />
                    </div>
                </div>
            </div>

        )
    }
};

UploadSettings.propTypes = {
    onBackClicked: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
}

