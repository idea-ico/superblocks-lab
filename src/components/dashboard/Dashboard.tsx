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
import ProjectList from './projectList';
import SideMenu, { ItemType } from './sideMenu';
import Topbar from './topbar';
import { IProject } from '../../models';
import style from './style.less';

interface IProps {
    getProjectList: () => void;

    projectList: IProject[];

    isAuthenticated: boolean;
}

interface IState {
    isAuthenticated: boolean;
}

export default class Dashboard extends Component<IProps, IState> {

    state: IState = {
        isAuthenticated: this.props.isAuthenticated
    };

    componentDidMount() {
        this.props.getProjectList();
    }

    onSideMenuItemSelected = (item: ItemType) => {
        console.log(item);
    }

    render() {
        const { projectList, isAuthenticated } = this.props;
        return(
            <div className={style.dashboard}>
                <Topbar />

                { isAuthenticated ?
                    <div>
                        <SideMenu
                            onItemSelected={this.onSideMenuItemSelected}
                        />
                        <div className={style.content}>
                            <ProjectList
                                listName={'All Your Projects'}
                                list={projectList}
                            />
                        </div>
                    </div>
                :
                    <div>
                        TODO - Show login/create new project view
                    </div>
                }
            </div>
        );
    }
}