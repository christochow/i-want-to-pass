import WebKit
class ViewController: UIViewController, WKUIDelegate {
    
    static let DocumentsDirectory = FileManager().urls(for: .documentDirectory, in: .userDomainMask).first!
    static let ArchiveURL = DocumentsDirectory.appendingPathComponent("course")
    
    var webView: WKWebView!
    
    func getDocumentsDirectory() -> URL {
        let paths = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)
        let documentsDirectory = paths[0]
        return documentsDirectory
    }
    
    override func loadView() {
        let webConfiguration = WKWebViewConfiguration()
        webView = WKWebView(frame: .zero, configuration: webConfiguration)
        self.webView.configuration.processPool = WKProcessPool()
        webView.uiDelegate = self
        webView.isOpaque = false;
        webView.backgroundColor = #colorLiteral(red: 0.1568627451, green: 0.1725490196, blue: 0.2039215686, alpha: 1)
        view = webView
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let savedArray: [HTTPCookie]
        do {
            let rawdata = try Data(contentsOf: self.getDocumentsDirectory().appendingPathComponent("cookies"))
            if let loadedStrings = try NSKeyedUnarchiver.unarchiveTopLevelObjectWithData(rawdata) as? [HTTPCookie] {
                savedArray = loadedStrings
                for c in savedArray {
                    webView.configuration.websiteDataStore.httpCookieStore.setCookie(c)
                }
            }
        } catch {
            print("Couldn't read file.")
        }
        
        let myURL = URL(string:"https://christochow.github.io/i-want-to-pass")
        let myRequest = URLRequest(url: myURL!)
        self.webView.load(myRequest)
    }
    
    override func viewWillDisappear(_ animated: Bool) { webView.configuration.websiteDataStore.httpCookieStore.getAllCookies({cookies in
        let fullPath = self.getDocumentsDirectory().appendingPathComponent("cookies")

        do {
            let data = try NSKeyedArchiver.archivedData(withRootObject: cookies, requiringSecureCoding: false)
            try data.write(to: fullPath)
        } catch {
            print("Couldn't write file")
        }})
    }
    
}

