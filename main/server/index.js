import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

const DATA_FILE_PATH = 'data.json';

let universitiesData = [];

async function loadData() {
  try {
    // Check if the file exists before reading
    const fileExists = await fs.access(DATA_FILE_PATH).then(() => true).catch(() => false);

    if (fileExists) {
      const data = await fs.readFile(DATA_FILE_PATH, 'utf8');
      universitiesData = JSON.parse(data);
    } else {
      console.log('Data file does not exist. Creating a new file.');
      await saveData(); // Create the file
    }
  } catch (err) {
    console.error('Error reading data from file:', err);
  }
}

async function saveData() {
  try {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(universitiesData, null, 2));
    console.log('Data saved to file successfully');
  } catch (err) {
    console.error('Error saving data to file:', err);
  }
}

app.get('/countries', (req, res) => {
  res.json({ message: 'countries data should go here' });
});

app.get('/universities/:universityName', (req, res) => {
  const { universityName } = req.params;

  const data = universitiesData.find((val) => val.universityName == universityName);
  if (!data) {
    return res.status(404).json({ message: [] });
  }
  console.log(data)
  res.json({message: data});
});

app.post('/universities',(req,res) => {
  const newUniversity = req.body;
  console.log(newUniversity)

  const university = universitiesData.find(u => u.universityName === newUniversity.universityName);
  
  if (university) {
    return res.json({ message: 'University already exists' });
  }
  universitiesData.push(newUniversity);

  saveData().then(() => {
    res.json({ message: newUniversity });
  });
});

app.post('/universities/reviews/:universityName', (req, res) => {
  const reviewContent = req.body;
  const { universityName } = req.params

  console.log(reviewContent);
  console.log(universityName);

  const university = universitiesData.find(u => u.universityName === universityName);

  if (!university) {
    universitiesData.push(reviewContent);
    saveData().then(() => {
      res.json({ message: reviewContent });
    });
    return res.json({message:reviewContent})
  }

  reviewContent.review.forEach(element => {
    university.review.push(element);
  });

  saveData().then(() => {
    res.json({ message: university });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  loadData();
});
