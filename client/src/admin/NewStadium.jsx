import React, { useEffect, useState } from 'react';
import Sidebar from '../admin/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { newStadiumAction, clearErrors } from '../store/actions/stadiumActions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);


const NewStadium = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [key, setKey] = useState('');
    const [capacity, setCapacity] = useState('');
    const [city, setCity] = useState('');
    const [description, setDescription] = useState('');
    const [infoHTML, setInfoHTML] = useState('');
    const [infoText, setInfoText] = useState('');
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const { error, success, loading } = useSelector(state => state.newStadium)

    useEffect(() => {
        if (error) {
            console.log(error);
            dispatch(clearErrors());
        }
        if (success) {
            console.log('Create stadium success');
        }
    }, [error, success, dispatch])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('key', key);
        formData.set('capacity', capacity);
        formData.set('city', city);
        formData.set('description', description);
        formData.set('infoHTML', infoHTML);
        formData.set('infoText', infoText);

        images.forEach(img => {
            formData.append('images', img);
        })

        dispatch(newStadiumAction(formData));
    }

    const onChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }
            reader.readAsDataURL(file)
        })
    }
    const handleEditorChange = ({ html, text }) => {
        setInfoHTML(html);
        setInfoText(text)
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
                            <h1 className="mb-4"><b>New Stadium</b></h1>

                            <div className="form-group">
                                <label htmlFor="name_field">Name Stadium:</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="key_field">Key Stadium:</label>
                                <input
                                    type="text"
                                    id="key_field"
                                    className="form-control"
                                    value={key}
                                    onChange={(e) => setKey(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="capacity_field">Capacity Stadium:</label>
                                <input
                                    type="text"
                                    id="capacity_field"
                                    className="form-control"
                                    value={capacity}
                                    onChange={(e) => setCapacity(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="city_field">City Stadium:</label>
                                <input
                                    type="text"
                                    id="city_field"
                                    className="form-control"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description_field">Description Stadium:</label>
                                <textarea
                                    className="form-control"
                                    id="description_field"
                                    rows="4"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="form-group mt-10">
                                <label>Info Stadium:</label>
                                <MdEditor style={{ height: '500px' }}
                                    renderHTML={text => mdParser.render(text)}
                                    onChange={handleEditorChange} />
                            </div>
                            <div className='form-group'>
                                <label>Many Image:</label>

                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        className='custom-file-input'
                                        id='customFile'
                                        onChange={onChange}
                                        multiple
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                    </label>
                                </div>


                                {imagesPreview.map(img => (
                                    <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                ))}

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

export default NewStadium