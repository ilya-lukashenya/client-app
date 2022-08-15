import { observer } from 'mobx-react-lite';
import { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form,  Segment} from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default observer (function ActivityForm() {
    const history = useNavigate();
    const {activityStore} = useStore();
    const {selectedActivity, createActivity, loadingInitial, loadActivity, updateActivity, loading} = activityStore;
    const {id} = useParams<{id: string}>();

    const [activity, setActivity] = useState({
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity]);


function handleSubmit() {
    if (activity.id.length === 0) {
        let newActivity = {
            ...activity,
            id: uuid()
        };
        createActivity(newActivity).then(() => history(`/activities/${newActivity.id}`))
    } else {
        updateActivity(activity).then(() => history(`/activities/${activity.id}`))
    }
}

function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = event.target;
    setActivity({...activity, [name]: value})
}

    if (loadingInitial) return <LoadingComponent content='Loading activity...' />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Decription' value={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange}/>
                <Form.Input type ='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})

