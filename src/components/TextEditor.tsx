import React from 'react'

export default function TextEditor() {
    return (
        <div className="text-container">
            <h2>Text:</h2>
            <div className="text-area-containter">
                <textarea
                    name="text"
                    id="text-area"
                    cols={60}
                    rows={25}
                    style={{ resize: 'none' }}
                ></textarea>
            </div>
        </div>
    )
}
