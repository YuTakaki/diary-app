import React from 'react';

const DiaryForm = ({addEntry, newDiary, setDiary}) => {
    return ( 
        <form onSubmit={addEntry}>
            <label htmlFor='title'>Title</label>
            <textarea id='title' type='text' placeholder={newDiary.title} onChange={(e) => setDiary(e.target.value, 'title')}></textarea>
            <label htmlFor='content'>Content</label>
            <textarea id='content' name='content' placeholder={newDiary.diary} onChange={(e) => setDiary(e.target.value, 'content')}></textarea>
            <input type='submit' />
        </form>
     );
}
 
export default DiaryForm;