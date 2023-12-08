async function processPDF() {
    const fileInput = document.getElementById('file-input');
    const resultSection = document.getElementById('result-section');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('pdfFile', file);

        try {
            const response = await fetch('/process-pdf', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const result = await response.json();

                resultSection.innerHTML = `<p>Resultados:</p><pre>${JSON.stringify(result, null, 2)}</pre>`;
            } else {
                resultSection.innerHTML = '<p>Erro ao processar o PDF.</p>';
            }
        } catch (error) {
            console.error('Erro ao fazer a solicitação ao servidor:', error);
            resultSection.innerHTML = '<p>Erro de comunicação com o servidor.</p>';
        }
    } else {
        resultSection.innerHTML = '<p>Selecione um arquivo PDF.</p>';
    }
}
