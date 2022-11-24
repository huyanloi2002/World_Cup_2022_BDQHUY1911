import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { newMatchDayAction, clearErrors } from '../store/actions/matchActions';

const NewTeam = () => {
    const dispatch = useDispatch();
    const { success, error } = useSelector(state => state.newMatchDay)

    const [name, setName] = useState('')
    const [date, setDate] = useState('')


    useEffect(() => {
        if (error) {
            console.log(error)
            dispatch(clearErrors())
        }
        if (success) {
            console.log('Create match successfully!')
        }

    }, [dispatch, error, success])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name)
        formData.set('date', date)

        dispatch(newMatchDayAction(formData))
        console.log(formData)

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

                            >
                                <h1 className="mb-4"><b>Create Match Day</b></h1>
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
                                    <label htmlFor="date_field">Date Match Day</label>
                                    <input
                                        type="date"
                                        id="date_field"
                                        className="form-control"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>
                                <button
                                    id="new_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                >
                                    CREATE MATCH DAY
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