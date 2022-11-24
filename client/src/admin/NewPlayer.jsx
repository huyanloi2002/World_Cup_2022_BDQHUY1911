import React, { useEffect, useState } from 'react';
import Sidebar from '../admin/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { newPlayerAction, clearErrors } from '../store/actions/playerActions'
import { getAllTeams } from '../store/actions/teamActions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

const positions = [
    { id: 1, pos: 'FW' },
    { id: 2, pos: 'MF' },
    { id: 3, pos: 'DF' },
    { id: 4, pos: 'GK' },
    { id: 5, pos: 'COACH' },
]

const NewPlayer = () => {
    const dispatch = useDispatch();
    const { loading, success, error: errNewPlayer } = useSelector(state => state.newPlayer)
    const { teams, error: errGetTeam } = useSelector(state => state.allTeams)

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [position, setPosition] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('');
    const [country, setCountry] = useState('');
    const [nameClub, setNameClub] = useState('');
    const [imageClub, setImageClub] = useState('');
    const [imageClubPreview, setImageClubPreview] = useState('');
    const [league, setLeague] = useState('');
    const [infoHTML, setInfoHTML] = useState('');
    const [infoContent, setInfoContent] = useState('');

    useEffect(() => {
        if (errNewPlayer) {
            console.log(errNewPlayer);
            dispatch(clearErrors())
        }
        if (success) {
            console.log('Create player succeeded!')
        }
    }, [dispatch, errNewPlayer, success])

    useEffect(() => {
        dispatch(getAllTeams())
        if (errGetTeam) {
            console.log(errGetTeam);
            dispatch(clearErrors())
        }
    }, [dispatch, errGetTeam])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name)
        formData.set('avatar', avatar)
        formData.set('position', position)
        formData.set('height', height)
        formData.set('weight', weight)
        formData.set('teamId', country)
        formData.set('imageClub', imageClub)
        formData.set('nameClub', nameClub)
        formData.set('league', league)
        formData.set('infoHTML', infoHTML)
        formData.set('infoContent', infoContent)

        dispatch(newPlayerAction(formData))

    }
    const onChangeAvatar = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    const onChangeImageClub = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setImageClubPreview(reader.result)
                setImageClub(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    const handleEditorChange = ({ html, text }) => {
        setInfoContent(text)
        setInfoHTML(html)
    }
    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <div className="container container-fluid">
                    <div className="wrapper-new-pr my-5 col-md-12">
                        <form className="shadow-lg"
                            onSubmit={submitHandler}
                            encType='multipart/form-data'>
                            <h1 className="mb-4"><b>New Player</b></h1>

                            <div className="form-group">
                                <label htmlFor="name_field">Name:</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="avatar_field">Avatar:</label>
                                <input type="file" name="image" onChange={onChangeAvatar}
                                />
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            id="img"
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt=''
                                            width='50'
                                        />
                                    </figure>
                                </div>

                            </div>
                            <div className="form-group">
                                <label htmlFor="position_field">Position</label>
                                <select className="form-control" id="position_field"
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                >
                                    <option value="">
                                        Choose Position:
                                    </option>
                                    {positions && positions.map(p => (
                                        <option key={p.id} value={p.pos}>
                                            {p.pos}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="height_field">Height:</label>
                                <input
                                    type="text"
                                    id="height_field"
                                    className="form-control"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="weight_field">Weight:</label>
                                <input
                                    type="text"
                                    id="weight_field"
                                    className="form-control"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="country_field">Country</label>
                                <select className="form-control" id="country_field"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                >
                                    <option value="">
                                        Choose Country:
                                    </option>
                                    {teams && teams.map(t => (
                                        <option key={t._id} value={t._id}>
                                            {t.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name_club_field">Name Club:</label>
                                <input
                                    type="text"
                                    id="name_club_field"
                                    className="form-control"
                                    value={nameClub}
                                    onChange={(e) => setNameClub(e.target.value)}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="image_club_field">Image Club:</label>
                                <input type="file" name="image" onChange={onChangeImageClub}
                                />
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            id="img"
                                            src={imageClubPreview}
                                            className='rounded-circle'
                                            alt=''
                                            width='50'
                                        />
                                    </figure>
                                </div>

                            </div>
                            <div className="form-group">
                                <label htmlFor="league_field">League:</label>
                                <input
                                    type="text"
                                    id="league_field"
                                    className="form-control"
                                    value={league}
                                    onChange={(e) => setLeague(e.target.value)}
                                />
                            </div>
                            <div className="form-group mt-10">
                                <label>Info Stadium:</label>
                                <MdEditor style={{ height: '500px' }}
                                    renderHTML={text => mdParser.render(text)}
                                    onChange={handleEditorChange} />
                            </div>
                            <button
                                id="login_button"
                                type="submit"
                                className="btn btn-block py-3"
                                disabled={loading ? true : false}
                            >
                                CREATE STADIUM
                            </button>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default NewPlayer;