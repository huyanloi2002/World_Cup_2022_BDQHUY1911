import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { newTeamAction } from '../store/actions/teamActions'

const mdParser = new MarkdownIt(/* Markdown-it options */);


const NewTeam = () => {
    const dispatch = useDispatch('')
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [continent, setContinent] = useState('');
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

    const { loading, error, success } = useSelector(state => state.newTeam);

    useEffect(() => {
        if (error) {
            console.log(error)
        }
        if (success) {
            console.log('Create team successfully')
        }
    }, [error, success])

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

        dispatch(newTeamAction(formData))
        console.log(formData)
    }
    const handleEditorChange = ({ html, text }) => {
        setInfoHTML(html);
        setInfoText(text);
    }
    const onChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setFlagPreview(reader.result)
                setFlag(reader.result)
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
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="code_field">Code Team</label>
                                    <input
                                        type="text"
                                        id="code_field"
                                        className="form-control"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="continent_field">Continent</label>
                                    <input
                                        type="text"
                                        id="continent_field"
                                        className="form-control"
                                        value={continent}
                                        onChange={(e) => setContinent(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="key_field">Key</label>
                                    <input
                                        type="text"
                                        id="key_field"
                                        className="form-control"
                                        value={key}
                                        onChange={(e) => setKey(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="aName_field">Asociacion Name</label>
                                    <input
                                        type="text"
                                        id="aName_field"
                                        className="form-control"
                                        value={aName}
                                        onChange={(e) => setAName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="cName_field">Continent Name</label>
                                    <input
                                        type="text"
                                        id="cName_field"
                                        className="form-control"
                                        value={cName}
                                        onChange={(e) => setCName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="cCode_field">Continent Code</label>
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
                                    <label>Infomation Team</label>
                                    <MdEditor style={{ height: '500px' }}
                                        renderHTML={text => mdParser.render(text)}
                                        onChange={handleEditorChange} />
                                </div>
                                <div className='form-group'>

                                    <input type="file" name="image" onChange={onChange}
                                    />
                                    <div>
                                        <figure className='avatar mr-3 item-rtl'>
                                            <img
                                                id="img"
                                                src={flagPreview}
                                                className='rounded-circle'
                                                alt=''
                                                width='50'
                                            />
                                        </figure>
                                    </div>

                                </div>

                                <button
                                    id="new_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    CREATE TEAM
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