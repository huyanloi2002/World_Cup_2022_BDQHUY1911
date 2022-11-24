import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateTeam, getTeamDetails, clearErrors } from '../store/actions/teamActions'
import actionTypes from '../store/actions/actionTypes';

const mdParser = new MarkdownIt(/* Markdown-it options */);


const NewTeam = ({ match, history }) => {
    const dispatch = useDispatch('')
    const { error, teamDetails } = useSelector(state => state.teamDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.updateDeleteTeam)
    const teamId = match.params.id

    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [continent, setContinent] = useState('');
    const [oldFlag, setOldFlag] = useState('');
    const [flag, setFlag] = useState('');
    const [flagPreview, setFlagPreview] = useState('');
    const [key, setKey] = useState('');
    const [aName, setAName] = useState('');
    const [cName, setCName] = useState('');
    const [cCode, setCCode] = useState('');
    const [video, setVideo] = useState('');
    const [map, setMap] = useState('');
    const [infoHTML, setInfoHTML] = useState('');
    const [infoText, setInfoText] = useState('');
    const [oldImageA, setOldImageA] = useState('');
    const [imageA, setImageA] = useState('');
    const [imageAPreview, setImageAPreview] = useState('');

    useEffect(() => {
        if (teamDetails && teamDetails._id !== teamId) {
            dispatch(getTeamDetails(teamId))
        } else {
            setName(teamDetails.name)
            setCode(teamDetails.code)
            setContinent(teamDetails.continent)
            setOldFlag(teamDetails.flag)
            setKey(teamDetails.assoc.key)
            setAName(teamDetails.assoc.name)
            setVideo(teamDetails.video)
            setMap(teamDetails.map)
            setCName(teamDetails.assoc.continental.name)
            setCCode(teamDetails.assoc.continental.code)
            setInfoHTML(teamDetails.infoHTML)
            setInfoText(teamDetails.infoText)
            setOldImageA(teamDetails.assoc.imageA)
        }
        if (error) {
            console.log(error)
            dispatch(clearErrors())
        }
        if (updateError) {
            console.log(updateError)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            console.log('Product updated successfully')
            dispatch({ type: actionTypes.UPDATE_TEAM_RESET })
            history.push('/list/team')
        }
    }, [error, teamDetails, teamId, updateError, dispatch, isUpdated, history])


    const submitHandler = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.set('name', name)
        formData.set('code', code)
        formData.set('continent', continent)
        formData.set('key', key)
        formData.set('aName', aName)
        formData.set('cName', cName)
        formData.set('cCode', cCode)
        formData.set('video', video)
        formData.set('map', map)
        formData.set('infoHTML', infoHTML)
        formData.set('infoText', infoText)
        formData.set('flag', flag)
        formData.set('imageA', imageA)

        dispatch(updateTeam(teamDetails._id, formData))
    }
    const handleEditorChange = ({ html, text }) => {
        setInfoHTML(html);
        setInfoText(text);
    }
    const onChangeFlag = (e) => {
        setOldFlag('')
        setFlag('')
        setFlagPreview('')
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setFlagPreview(reader.result)
                setFlag(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0]);
    }
    const onChangeImageA = (e) => {
        setImageA('')
        setImageAPreview('')
        setOldImageA('')
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImageAPreview(reader.result)
                setImageA(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0]);
    }
    return (
        <div>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <div className="container container-fluid">
                        <div className="wrapper-new-pr my-5 col-md-12">
                            <form className="shadow-lg"
                                onSubmit={submitHandler}
                                encType='multipart/form-data'
                            >
                                <h1 className="mb-4"><b>Create Team</b></h1>

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

                                <div className="form-group">
                                    <label htmlFor="code_field">Code Team:</label>
                                    <input
                                        type="text"
                                        id="code_field"
                                        className="form-control"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="continent_field">Continent:</label>
                                    <input
                                        type="text"
                                        id="continent_field"
                                        className="form-control"
                                        value={continent}
                                        onChange={(e) => setContinent(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="key_field">Key:</label>
                                    <input
                                        type="text"
                                        id="key_field"
                                        className="form-control"
                                        value={key}
                                        onChange={(e) => setKey(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="aName_field">Asociacion Name:</label>
                                    <input
                                        type="text"
                                        id="aName_field"
                                        className="form-control"
                                        value={aName}
                                        onChange={(e) => setAName(e.target.value)}
                                    />
                                </div>
                                <div className='form-group'>
                                    <span style={{ margin: '10px 0' }}>Asociacion Flag:</span>
                                    <div className="image-asoc">
                                        <input type="file" name="image-asoc" onChange={onChangeImageA}
                                        />
                                        {oldImageA &&
                                            <img src={oldImageA.url} alt="" className="mt-3 mr-2" width="55" height="52" />

                                        }
                                        {imageAPreview &&
                                            <img src={imageAPreview} alt="" className="mt-3 mr-2" width="55" height="52" />
                                        }
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cName_field">Continent Name:</label>
                                    <input
                                        type="text"
                                        id="cName_field"
                                        className="form-control"
                                        value={cName}
                                        onChange={(e) => setCName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="cCode_field">Continent Code:</label>
                                    <input
                                        type="text"
                                        id="cCode_field"
                                        className="form-control"
                                        value={cCode}
                                        onChange={(e) => setCCode(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="video_field">Video Youtube</label>
                                    <input
                                        type="text"
                                        id="video_field"
                                        className="form-control"
                                        value={video}
                                        onChange={(e) => setVideo(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="map_field">Google Map</label>
                                    <input
                                        type="text"
                                        id="map_field"
                                        className="form-control"
                                        value={map}
                                        onChange={(e) => setMap(e.target.value)}
                                    />
                                </div>

                                <div className="form-group mt-10">
                                    <label>Infomation Team:</label>
                                    <MdEditor style={{ height: '500px' }}
                                        renderHTML={text => mdParser.render(text)}
                                        onChange={handleEditorChange} />
                                </div>
                                <div className='form-group'>
                                    <span style={{ margin: '10px 0' }}>Flag:</span>
                                    <div className="image-flag">
                                        <input type="file" name="flag" onChange={onChangeFlag}
                                        />
                                        {oldFlag &&
                                            <img src={oldFlag.url} alt="" className="mt-3 mr-2" width="55" height="52" />

                                        }
                                        {flagPreview &&
                                            <img src={flagPreview} alt="" className="mt-3 mr-2" width="55" height="52" />
                                        }
                                    </div>
                                </div>

                                <button
                                    id="new_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    UPDATE TEAM
                                </button>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewTeam