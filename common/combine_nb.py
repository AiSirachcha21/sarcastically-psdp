import nbformat

text_notebook = nbformat.read('../text_model/text-model.ipynb', as_version=4)
audio_notebook = nbformat.read('../audio_model/audio-model.ipynb', as_version=4)

joint_notebook = nbformat.v4.new_notebook(metadata=text_notebook.metadata)

joint_notebook.cells = text_notebook.cells + audio_notebook.cells

nbformat.write(joint_notebook, '../sarcastically.ipynb')
