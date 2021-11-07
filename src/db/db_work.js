const DB = require('./index');

class DBWork extends DB {
  async createWork(work) {
    const {
      workName,
      workDetails,
      languageId,
      link,
      gitLink,
      coverImage,
      coverImageType,
    } = work;
    try {
      const covImgRes = await this.pool.query(
        'SELECT "Insert_Cover_Image" ($1, $2)',
        [coverImage, coverImageType]
      );
      const coverImageId = covImgRes.rows[0].Insert_Cover_Image;
      const workRes = await this.pool.query(
        'SELECT "Insert_Work" ($1, $2, $3)',
        [link, gitLink, coverImageId]
      );
      const workId = workRes.rows[0].Insert_Work;
      await this.pool.query('SELECT "Insert_Work_Details" ($1, $2, $3, $4)', [
        workName,
        workDetails,
        languageId,
        workId,
      ]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async updateWorkDetails(work) {
    const { workId, languageId, workName, workDetails } = work;
    try {
      await this.pool.query('SELECT "Update_Work_Details" ($1, $2, $3, $4)', [
        workName,
        workDetails,
        languageId,
        workId,
      ]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async updateWork(work) {
    const { workId, link, gitLink, coverImageId } = work;
    try {
      await this.pool.query('SELECT "Update_Work" ($1, $2, $3, $4)', [
        workId,
        link,
        gitLink,
        coverImageId,
      ]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async updateCoverImage(coverImageData) {
    const { coverImageId, coverImage, coverImageType } = coverImageData;
    try {
      await this.pool.query('SELECT "Update_Cover_Image" ($1, $2, $3)', [
        coverImageId,
        coverImage,
        coverImageType,
      ]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async insertLanguage(languageData) {
    const { language, languageShort } = languageData;
    try {
      await this.pool.query('SELECT "Insert_Language" ($1, $2)', [
        language,
        languageShort,
      ]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async insertWorkDetails(workDetailsData) {
    const { workName, workDetails, languageId, workId } = workDetailsData;
    try {
      await this.pool.query('SELECT "Insert_Work_Details" ($1, $2, $3, $4)', [
        workName,
        workDetails,
        languageId,
        workId,
      ]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async getAllWorksByLanguage(languageId) {
    try {
      const dataWork = await this.pool.query(
        'SELECT * FROM "works" w JOIN "cover_image" c ON w.cover_image_id = c.id JOIN "work_details" wd ON w.id = wd.work_id and wd.language_id = ($1)',
        [languageId]
      );
      if (dataWork.rows) {
        return { success: true, data: dataWork.rows };
      }
      return { success: false, status: 404 };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async getWorkByIdAndLanguage(workId, languageId) {
    try {
      const dataWork = await this.pool.query(
        'SELECT * FROM "works" w JOIN "cover_image" c ON w.cover_image_id = c.id JOIN "work_details" wd ON w.id = wd.work_id and wd.language_id = ($1) WHERE w.id = ($2)',
        [languageId, workId]
      );
      if (dataWork.rows) {
        return { success: true, data: dataWork.rows[0] };
      }
      return { success: false, status: 404 };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async getAllLanguages() {
    try {
      const dataWork = await this.pool.query('SELECT * FROM "language"');
      if (dataWork.rows) {
        return { success: true, data: dataWork.rows };
      }
      return { success: false, status: 404 };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async deleteWorkById(workId) {
    try {
      await this.pool.query('SELECT "Delete_Work" ($1)', [workId]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  }
}

module.exports = DBWork;
