/**
 * 发布上传配置
 */
export default {
    project: 'iwjw-rent-h5',
    description: '本文件是自动化上传的配置文件，versionType为Enum(0,1,2)。0是指自动管理版本号，1是指手动管理版本号，2是根据manifest文件管理',
    versionType: 2,
    api: {
        uploadSuffix: '/resource/uploadAuto.do',
        openAutoSuffix: '/resource/openAuto.do',
        versionSuffix: '/resource/getResourceVersion.do'
    },
    serverEnv: {
        test: {
            serverUrl: '',
            projectId: ''
        },
        beta: {
            serverUrl: '',
            projectId: ''
        }
    },
    zipFilePath: `${process.cwd()}/zip/iwjw-rent-h5.zip`,
    // ftp deploy
    ftp: {
        host: '',
        user: '',
        password: ''
    }
}
