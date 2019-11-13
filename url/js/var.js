window.pages = {
    "north": {
        "chat": {
            "/chat/live/": {"offline": "/chat/url/html/live-index.html", "paging": "/chat/url/json/live-index.json"},
            "/chat/live/#/": {"offline": "/chat/user/online.html", "paging": "/chat/url/json/live-index.json"}
        }
    },
    "east": {
        "chat": {
            "/chat/dm/": {"offline": "/chat/url/html/dm-index.html", "paging": "/chat/url/json/dm-index.json"},
            "/chat/dm/inbox/": {"offline": "/chat/url/html/dm-inbox.html", "paging": "/chat/url/json/dm-index.json"},
            "/chat/dm/convo/": {"offline": "/chat/url/html/dm-new.html", "paging": "/chat/url/json/dm-index.json"},
            "/chat/dm/convo/#/": {"offline": "/chat/url/html/dm-convo.html", "paging": "/chat/url/json/dm-index.json"}
        }
    },
    "central": {
        "chat": {          
            "/chat/": {"offline": "/chat/url/html/index-index.html", "paging": "/chat/url/json/index-index.json"},
        }
    },
    "south": {
        "chat": {
            "/chat/story/": {"offline": "/chat/url/html/story-index.html", "online": "/chat/url/html/story-story.html", "paging": "/chat/url/json/story-index.json"},
            "/chat/story/#/": {"offline": "/chat/url/html/story-story.html", "paging": "/chat/url/json/story-index.json"},
        }
    },
    "west": {
        "chat": {
            "/chat/room/": {"offline": "/chat/room/offline.html", "paging": "/chat/url/json/room-index.json"},
            "/chat/room/#/": {"offline": "/chat/room/room.html", "paging": "/chat/url/json/room-index.json"},
        }
    }
};