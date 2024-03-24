window.addEventListener('DOMContentLoaded', () => {
    const inlineEdit = document.getElementById('inlineEditing');
    let placeholderData = 'Change the text...';

    inlineEdit.addEventListener('click', () => {
        const inputElem = document.createElement('input'); // Create new input element

        inputElem.type = 'text';
        inputElem.value = placeholderData;
        inlineEdit.replaceWith(inputElem);
        inputElem.focus();

        // function to finish editing
        const replaceInputToText = (e) => {
            placeholderData = e.target.value;
            inlineEdit.textContent = placeholderData;
            inputElem.replaceWith(inlineEdit);
        } 

        inputElem.addEventListener('change', (e) => {
            replaceInputToText(e)
        })

        // event 'keydown' and 'blur' create in case the user does not edit the field at all 
        // but wants to exit edit mode.
        inputElem.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                replaceInputToText(e)
            }
        });

        inputElem.addEventListener('blur', (e) => {
            replaceInputToText(e)
        });
    })
})