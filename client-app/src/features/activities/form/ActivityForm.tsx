import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, FormField, Label, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';


const ActivityForm = () => {
    const history = useHistory();
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();
    const [activity, setActivity] = useState({
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required('The activity category is required'),
        date: Yup.string().required('The activity date is required'),
        city: Yup.string().required('The activity description is required'),
        venue: Yup.string().required('The activity venue is required'),
    })

    // const handlerSubmit = () => {
    //     if (activity.id.length === 0) {
    //         let newActivity = {
    //             ...activity,
    //             id: uuid()
    //         }
    //         createActivity(newActivity).then(() => {
    //             history.push(`/activities/${newActivity.id}`)
    //         });
    //     } else {
    //         updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
    //     }
    // }

    // const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = event.target;

    //     setActivity({
    //         ...activity,
    //         [name]: value
    //     })
    // }

    useEffect(() => {
        if (id) { loadActivity(id).then(activity => setActivity(activity!)) }
    }, [id, loadActivity])

    if (loadingInitial) return <LoadingComponent content='Loading activity...' />

    return (
        <Segment clearing>
            <Formik
                validationSchema={validationSchema}
                initialValues={activity}
                enableReinitialize
                onSubmit={(values) => console.log(values)}
            >
                {({ handleSubmit }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' >
                        <MyTextInput placeholder='Title' name="title" />
                        <MyTextArea rows={3} placeholder='Description' name="description" />
                        <MySelectInput options={categoryOptions} placeholder='Category' name="category" />
                        <MyTextInput placeholder='Date' name="date" />
                        <MyTextInput placeholder='City' name="city" />
                        <MyTextInput placeholder='Venue' name="venue" />
                        <Button loading={loading} floated='right' positive type='submit' content="Submit" />
                        <Button as={Link} to='/activities' floated='right' type='button' content="Cancel" />
                    </Form>
                )}

            </Formik>
        </Segment>
    )
}

export default observer(ActivityForm);