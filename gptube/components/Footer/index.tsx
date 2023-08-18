import { LinkedinOutlined, GoogleOutlined } from '@ant-design/icons'

const iconSize = {
  fontSize: '30px',
  backgroundColor: '#6C6C6C',
  padding: '10px',
  borderRadius: '100%',
  color: 'white',
}

function Footer() {
  return (
    <footer className="mx-10 mt-auto mb-6 bg-black-full">
      <button
        className="px-2 text-base font-medium border-2 rounded-lg cursor-auto text-typo border-typo"
        type="button"
      >
        CONTACT US
      </button>
      <div className="flex justify-center gap-4 mb-4">
        <a
          className="flex items-center gap-1"
          href="mailto:gptube.team@gmail.com?subject=Hi, I want to know more about GPTube"
        >
          <GoogleOutlined rev={undefined} style={iconSize} />
        </a>
        <a
          href="https://www.linkedin.com/posts/saul-rojas-6885b1188_buildinpublic-vercel-activity-7071255622289117184-lyh8?utm_source=share&utm_medium=member_desktop"
          rel="noopener"
          target="_blank"
        >
          <LinkedinOutlined rev={undefined} style={iconSize} />
        </a>
      </div>
      <p className="mt-2 text-center text-white">Copyright © 2023 GPTube, 2023</p>
    </footer>
  )
}

export default Footer
