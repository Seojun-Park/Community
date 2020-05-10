import React, { useState } from 'react';
import styled from 'styled-components';
import { storage } from '../firebase'

const Wrapper = styled.div`

`

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`


export default () => {
    const [content, setContent] = useState({
        image: null,
        url: '',
        progress: 0
    })
    const handleChange = e => {
        if (e.target.files[0]) {
            setContent({ image: e.target.files[0] })
        }
    }

    const handleUpload = () => {
        console.log(content.image)
        const uploadTask = storage
            .ref(`images/${content.image.name}`)
            .put(content.image);
        uploadTask.on('state_changed', (snapshot) => {
            //progress
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setContent({ progress })
        },
            (error) => {
                console.log(error)
            },
            () => {
                console.log(content.image.name)
                storage.ref('images')
                    .child(content.image.name)
                    .getDownloadURL()
                    .then(url => {
                        setContent({ url })
                    })
            }
        );
    }

    console.log(content, content.image, content.url)
    return (
        <Wrapper>
            <Container>
                <progress value={content.progress} max="100" />
                <br />
                <input type="file" onChange={handleChange} />
                <button onClick={handleUpload}>upload</button>
                <br />
                <img src={content.url || "https://via.placeholder.com/350x150"} alt="Uploaded Images" height="300" width="400" />
            </Container>
        </Wrapper>
    )
}