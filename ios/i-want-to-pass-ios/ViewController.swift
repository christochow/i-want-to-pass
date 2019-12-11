import WebKit
class ViewController: UIViewController, WKUIDelegate {
    
    var webView: WKWebView!
    
    override func loadView() {
        let webConfiguration = WKWebViewConfiguration()
        webView = WKWebView(frame: .zero, configuration: webConfiguration)
        webView.uiDelegate = self
        webView.isOpaque = false;
        webView.backgroundColor = #colorLiteral(red: 0.1568627451, green: 0.1725490196, blue: 0.2039215686, alpha: 1)
        view = webView
    }
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let myURL = URL(string:"https://christochow.github.io/i-want-to-pass")
        let myRequest = URLRequest(url: myURL!)
        webView.load(myRequest)
    }
    
}

