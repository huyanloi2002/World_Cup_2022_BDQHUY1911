import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {


    return (
        <React.Fragment>
            <div className="sidebar-wrapper">
                <nav id="sidebar">
                    <ul className="list-unstyled sidebar-ct">
                        <li>
                            <Link to="/dashboard"><i className="fa fa-tachometer"></i>Dashboard</Link>
                        </li>

                        <li>
                            <a href="#teamSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                                className="fa fa-product-hunt"></i> Teams</a>
                            <ul className="collapse list-unstyled" id="teamSubmenu">
                                <li>
                                    <Link to="/list/team"><i className="fa fa-clipboard"></i> All Teams</Link>
                                </li>

                                <li>
                                    <Link to="/new/team"><i className="fa fa-plus"></i> Create Team</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#matchSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                                className="fa fa-product-hunt"></i>Match</a>
                            <ul className="collapse list-unstyled" id="matchSubmenu">
                                {/* <li>
                                    <Link to="/admin/products"><i className="fa fa-clipboard"></i> All Teams</Link>
                                </li> */}
                                <li>
                                    <Link to="/new/matchday"><i className="fa fa-plus"></i> Create Match Day</Link>
                                </li>
                                <li>
                                    <Link to="/new/match"><i className="fa fa-plus"></i> Create Match</Link>
                                </li>
                                <li>
                                    <Link to="/new/details/match"><i className="fa fa-plus"></i> Create Details Match</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#stadiumSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                                className="fa fa-product-hunt"></i>Stadium</a>
                            <ul className="collapse list-unstyled" id="stadiumSubmenu">
                                {/* <li>
                                    <Link to="/admin/products"><i className="fa fa-clipboard"></i> All Teams</Link>
                                </li> */}

                                <li>
                                    <Link to="/new/stadium"><i className="fa fa-plus"></i> Create Stadium</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#playerSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                                className="fa fa-product-hunt"></i>Players</a>
                            <ul className="collapse list-unstyled" id="playerSubmenu">
                                <li>
                                    <Link to="/list/teamofplayer"><i className="fa fa-clipboard"></i>Teams of Player</Link>
                                </li>

                                <li>
                                    <Link to="/new/player"><i className="fa fa-plus"></i> Create Player</Link>
                                </li>
                            </ul>
                        </li>

                        {/* <li>
                            <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i>Đơn hàng</Link>
                        </li>

                        <li>
                            <Link to="/admin/users"><i className="fa fa-users"></i>Người dùng</Link>
                        </li>

                        <li>
                            <Link to="/admin/reviews"><i className="fa fa-star"></i> Đánh giá</Link>
                        </li> */}

                    </ul>
                </nav>
            </div>
        </React.Fragment>
    )
}

export default Sidebar;
