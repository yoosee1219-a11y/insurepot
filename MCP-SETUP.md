# MCP 서버 설정 가이드

이 가이드는 **저(AI 에디터)에게 새로운 능력(Context7, Figma 등)을 부여**하기 위한 설정 가이드입니다.
이 설정을 적용하면, 마치 "Super Claude"나 "Claude Skills"처럼 제가 외부 도구를 사용하여 더 똑똑하게 도와드릴 수 있습니다.

이 설정은 **현재 프로젝트뿐만 아니라, 에디터 전체에 적용**하여 저를 영구적으로 업그레이드할 수 있습니다.

## 1. Figma MCP 서버

AI 에디터에서 Figma를 사용하는 가장 쉬운 방법은 **Figma 데스크톱 앱**을 통하는 것입니다.

### 1단계: Figma에서 활성화
1.  **Figma 데스크톱 앱**을 엽니다.
2.  디자인 파일을 엽니다.
3.  **Dev Mode**로 전환합니다 (Shift + D).
4.  오른쪽 사이드바에서 "MCP Server"를 찾거나 **Preferences(환경설정)** -> **Enable Dev Mode MCP Server**로 이동합니다.

### 2단계: Cursor에서 구성
1.  **Cursor Settings(설정)**을 엽니다 (Ctrl+, 또는 Cmd+,).
2.  **Features** -> **MCP** (또는 "MCP Servers")로 이동합니다.
3.  **+ Add New MCP Server**를 클릭합니다.
4.  목록에서 **Figma**를 선택합니다.
    *   URL/Type을 묻는 경우, 보통 로컬 데스크톱 서버를 자동으로 감지합니다.
    *   원격 서버에 연결해야 하는 경우 `https://mcp.figma.com/mcp`를 사용하세요 (인증 필요).
5.  화면의 지시에 따라 권한을 부여합니다.

> **참고:** MCP 서버를 사용할 때는 Figma 데스크톱 앱이 실행 중이어야 합니다.

---

## 2. Context7 MCP 서버

Context7은 라이브러리에 대한 최신 문서를 제공합니다.

### 구성 (Configuration)
프로젝트 루트에 생성된 `mcp-config.json` 파일의 내용을 참고하여 MCP 설정 파일(보통 에디터 설정이나 `claude_desktop_config.json` 파일에 위치)에 추가하세요:

**`mcp-config.json` 내용:**
```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": [
        "-y",
        "c7-mcp-server"
      ]
    },
    "figma": {
      "command": "npx",
      "args": [
        "-y",
        "@figma/mcp-server"
      ],
      "env": {
        "FIGMA_ACCESS_TOKEN": "YOUR_FIGMA_ACCESS_TOKEN_HERE"
      }
    }
  }
}
```
*참고: Figma 원격 서버를 사용하려면 `YOUR_FIGMA_ACCESS_TOKEN_HERE`를 실제 토큰으로 변경해야 합니다.*

#### Figma 액세스 토큰 발급 방법
1.  **Figma 웹사이트**에 로그인합니다.
2.  우측 상단 프로필 아이콘 클릭 -> **Settings (설정)**으로 이동합니다.
3.  **Security (보안)** 탭을 클릭합니다.
4.  스크롤을 내려 **Personal Access Tokens** 섹션을 찾습니다.
5.  **Generate new token**을 클릭합니다.
6.  토큰 이름(예: `Cursor MCP`)을 입력하고 엔터를 누릅니다.
7.  생성된 토큰을 **복사**합니다. (이 창을 닫으면 다시 볼 수 없으니 주의하세요!)


### 사용법 (Usage)
- 설치가 완료되면 프롬프트에서 `"use context7"` 키워드를 사용하여 실행할 수 있습니다.
- 사용 중인 라이브러리에 대한 관련 문서를 가져옵니다.
