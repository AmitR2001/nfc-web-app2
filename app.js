// document.getElementById('writeButton').addEventListener('click', async () => {
//     const name = document.getElementById('nameInput').value;
//     if ('NDEFWriter' in window) {
//         try {
//             const ndef = new NDEFWriter();
//             await ndef.write({ records: [{ recordType: "text", data: name }] });
//             document.getElementById('message').textContent = 'Name written to NFC tag!';
//         } catch (error) {
//             document.getElementById('message').textContent = `Error: ${error}`;
//         }
//     } else {
//         document.getElementById('message').textContent = 'Web NFC is not supported on this device.';
//     }
// });

document.getElementById('writeButton').addEventListener('click', async () => {
    const name = document.getElementById('nameInput').value;
    if ('NDEFReader' in window) {
        try {
            const ndef = new NDEFReader();
            await ndef.write("Hello World").then(() => {
                document.getElementById('message').textContent = 'Message written.';
            }).catch(error => {
                document.getElementById('message').textContent = `Write failed :-( try again: ${error}.`;
            });
        } catch (error) {
            document.getElementById('message').textContent = `Error: ${error}`;
        }
    } else {
        document.getElementById('message').textContent = 'Web NFC is not supported on this device.';
    }
});

document.getElementById('readButton').addEventListener('click', async () => {
    if ('NDEFReader' in window) {
        try {
            const ndef = new NDEFReader();
            await ndef.scan();
            ndef.onreading = event => {
                const decoder = new TextDecoder();
                for (const record of event.message.records) {
                    document.getElementById('message').textContent = `NFC Tag contains: ${decoder.decode(record.data)}`;
                }
            };
        } catch (error) {
            document.getElementById('message').textContent = `Error: ${error}`;
        }
    } else {
        document.getElementById('message').textContent = 'Web NFC is not supported on this device.';
    }
});